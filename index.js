const cloud = require("./libs/d3.layout.cloud");


$.ajax({
    url: "/dataset/citibeats.csv",
    success: function (result) {
        start($.csv.toObjects(result));
    }
});



// global values
var stopwords = ['milton', 'keynes', 'mk'];
var maxValue = 1;
var node = '#cloud';
var dataFile = null;
var dataSource = null;


function start(data) {
    dataFile = Array.from(data);
    // console.log(data);

    var startDate = null, untilDate = null;

    // saving data
    dataSource = Object.assign([],data.map(function (value) {
        return {text: value.tag.toLowerCase(), size: parseInt(value.value), day: moment(value.since).toISOString()}
    }));
    console.log(dataSource);
    // elaborate the CSV into the data structure
    var tags = data.reduce(function (res, val) {
        if (stopwords.indexOf(val.tag.toLowerCase()) > -1) {
            return res;
        }
        if (parseFloat(val.tag)) {
            return res;
        }

        var index = res.map(function (value) {
            return value.tag
        }).indexOf(val.tag);
        var date = moment(val.since).toISOString();
        var until = moment(val.until).toISOString();

        if (!startDate || startDate > date) {
            startDate = date;
        }
        if (!untilDate || untilDate < until) {
            untilDate = until;
        }

        if (index < 0) {
            var o = {
                sum: parseInt(val.value),
                dates: [],
                values: [],
                tag: val.tag
            };
            res.push(o);
            index = res.length - 1;
        }

        res[index].dates.push(date);
        res[index].values.push(parseInt(val.value));
        res[index].sum += parseInt(val.value);

        return res;
    }, []); // higher value to lower


    // console.log(timeWindow.start().toISOString(),timeWindow.end().toISOString());
    var days = generateDates(startDate, untilDate);
    // print time
    printTimeline(days, node);

    // console.log(days);
    // merging dates in intervals
    tags = mergeDatesInIntervals(tags);


    // split tags by interval
    tags = splitTags(tags);

    // sort tags
    // incremental duration, higher value
    tags.sort(function (a, b) {
        // incremental duration
        var delta = a.duration - b.duration;
        if (delta !== 0) return delta;
        // decrementing valye
        return b.value - a.value;
    }); // sort by min duration;
    tags.reduce(function (value) {

    }, []);


    // console.log(tags);
    // building the matrix
    var matrix = buildMatrix(tags, days);

    console.log(matrix);
    // building the cloud tags
    var cloud = buildCloud(matrix);

    console.log(cloud);
    // rendering the cloud
    renderTable(cloud);


    initListners(days, matrix);
}




function initListners(days, matrix) {
    var daysIndexes = days.map(function (value) { return value.toISOString(); });

    var highlightFrom = '';
    var highlightTo = '';

    $('#interval button').click(function(){reset()});
    $('#mini-cloud button').click(function(){toggleResize()});

    $('.tic').each(function () {
        $(this).click(function(e){
            var date = moment(e.target.attributes.value.value);
            var isoDate = date.toISOString();

            // if between
            if(highlightFrom && highlightTo && highlightFrom < isoDate && highlightTo > isoDate){
                // calc left and right deltas and compress the interval
                var deltaLeft = moment(isoDate).endOf('day').diff(moment(highlightFrom).startOf('day'),'days');
                var deltaRight = moment(highlightTo).endOf('day').diff(moment(isoDate).startOf('day'),'days');
                console.log(deltaLeft, deltaRight);
                // if isoDate is closer to the beginning of the interval
                // change the start of the interval
                if(deltaLeft <= deltaRight) {
                    console.log('left');
                    highlightFrom = isoDate;
                }else{ // else change the end of the interval
                    console.log('right');
                    highlightTo = isoDate;
                }
            }

            // update interval by extending it
            if(highlightFrom > isoDate){
                highlightFrom = isoDate;
            }
            if(highlightTo < isoDate){
                highlightTo = isoDate;
            }

            if(highlightFrom === ''){
                highlightFrom = isoDate;
            }
            if(highlightTo === ''){
                highlightTo = isoDate;
            }

            // console.log(highlightFrom,highlightTo);


            // reset all styles
            $('.tic').each(function () {
                $(this).removeClass('highlight');
            });
            $('.tag').each(function () {
                $(this).removeClass('highlight');
                $(this).addClass('downlight');
            });


            // // calc new style
            var start = moment(highlightFrom);
            var end = moment(highlightTo);
            $('#interval').show();
            $('#interval label').empty();
            $('#interval label').append(start.format('D/MM/YYYY')+' - '+end.format('D/MM/YYYY'));

            // init array
            var highlightDays = [];
            // var highlightDays = [highlightFrom];
            // $('th[value="'+highlightFrom+'"').addClass('highlight');
            var delta = end.endOf('day').diff(start.startOf('day'),'days')+1;

            var miniCloud = [];
            // building list of days to highlight
            for(var i = 0; i < delta; i++){
                var day = start.add(Math.min(i,1),'d').toISOString();
                highlightDays.push(day);
                // set tic style
                $('th[value="'+day+'"').addClass('highlight');

                var index = daysIndexes.indexOf(day);
                // console.log(index);
                // get the relevant tags
                var tags = matrix.reduce(function (tags, layer, i) {
                    if( typeof layer[index] === 'undefined'){return tags;}
                    return tags.concat(layer[index]);
                }, []);
                // console.log(tags);
                miniCloud = miniCloud.concat(...tags);
                // highlight tags
                setStyle(tags);
            }
            // console.log(highlightDays);
            miniCloud = miniCloud.reduce(function (r,v) {
                var text = v.split(':')[0].toLowerCase().trim();
                var size = dataSource.reduce(function (val, t) {
                    // if(t.text === text || t.text === 'rough sleepers')
                    //     console.log(t.text, text,t.day,highlightFrom, t.day >= highlightFrom, t.day <= highlightTo);
                    if(t.text === text && t.day >= highlightFrom && t.day <= highlightTo){
                        val += t.size;
                    }
                    return val;
                },0);
                var i = r.map(function (value) { return value.key }).indexOf(text);
                console.log(text, i);
                if(i < 0){
                    return r.concat({key:text,value:size});
                }
                r[i].value = size;
                return r;
            },[]);
            console.log('here ',miniCloud.map(function (value) { return Object.assign({},value); }));
            drawMiniCloud(miniCloud);
        });
    });
}

function setStyle(highlights) {
    // console.log('highlights',highlights);
    // reset style
    if(typeof highlights === 'undefined' || !highlights || highlights === ''){
        // reset all style
        $('.tag').each(function () {
            // remove highlight class
            $(this).removeClass('highlight');
            $(this).addClass('downlight');
        });
        return;
    }

    // set style
    $('.tag').each(function () {
        var tag = $(this).text();
        // console.log('setting',tag,highlights,highlights.indexOf(tag));
        // if tag included in the highlights list
        if(highlights.indexOf(tag) > -1 ){
            $(this).addClass('highlight');
            $(this).removeClass('downlight');
        }
    });
}

function mergeDatesInIntervals(tags) {
    return tags.map(function (value) {
        value.dates.sort();
        // console.log(value.dates);
        value.intervals = [];
        value.valuesInterval = [];
        value.dates.map(function (key, index) {

            // if not, add an interval
            if (value.intervals.length < 1 || value.intervals[value.intervals.length - 1].end().toISOString() !== key) {
                value.intervals.push(moment.interval(moment(key), moment.duration(1, 'd')));
                value.valuesInterval.push(value.values[index]);
                // console.log(intervals[0].period().asDays());
                if (maxValue < value.values[index]) {
                    maxValue = value.values[index];
                }
            } else {
                // update interval duration
                value.intervals[value.intervals.length - 1] = moment.interval(value.intervals[value.intervals.length - 1].start(), value.intervals[value.intervals.length - 1].period().add(1, 'd'))
                value.valuesInterval[value.intervals.length - 1] += value.values[index];
                if (maxValue < value.valuesInterval[value.intervals.length - 1]) {
                    maxValue = value.valuesInterval[value.intervals.length - 1];
                }
            }

        });
        value.durations = value.intervals.map(function (value2) {
            return value2.period().asDays()
        });
        return value;
    });
}


function splitTags(tags) {
    return tags.reduce(function (r, tag) {

        return r.concat(...tag.intervals.map(function (i, index) {
            var o = {
                key: i.start().toISOString() + " " + i.end().toISOString(),
                tag: tag.tag,
                value: tag.valuesInterval[index],
                interval: i,
                start: i.start().toISOString(),
                until: i.end().toISOString(),
                duration: i.period().asDays(),
                dates: generateDates(i.start().toISOString(), i.end().toISOString())
            };

            return o;
        }));
    }, []);
}

function printTimeline(days, node) {
    var daysLabes = '<tr class="timeline">' + days.reduce(function (children, d) {
        return children + '<th class="tic" value="'+d.toISOString()+'">' + d.format('DD/MM/YY') + '</th>';
    }, '') + '</tr>';
    $(node).append(daysLabes);
}

function buildMatrix(tags, days) {
    // building the matrix
    var matrix = [Array(days.length)];
    var isoDays = days.map(function (value) {
        return value.toISOString()
    });
    tags.map(function (o) {

        // building the matrix
        // testing if there is room in the current layer

        // scan all matrix level to fit the dates
        var currentIndex = matrix.reduce(function (i, layer, cIndex) {
            // if found a suitable layer do nothing
            if (i !== false) {
                return i;
            }

            // scan the layer to fit the dates
            var c = o.dates.reduce(function (c, v) {
                // console.log(matrix[matrix.length - 1],v.toISOString());
                // if(matrix.length < 1) return true;
                return c && (!layer[isoDays.indexOf(v.toISOString())] || layer[isoDays.indexOf(v.toISOString())] === o.tag + ":" + o.value)
            }, true);
            // found a layer, returning index
            if (c !== false) {
                return cIndex;
            }
            // return false to continue
            return false;
        }, false);


        // console.log('can be updated?',currentIndex,matrix[matrix.length - 1],o.tag);
        // add a layer
        // if there is no place, add a new layer
        if (currentIndex === false) {
            matrix.push(Array(days.length));
            // update layer
            currentIndex = matrix.length - 1;
        }
        // set the dates in the right layer
        o.dates.map(function (v) {
            // update latest layer
            // console.log(matrix,matrix.length-1);
            return matrix[currentIndex][isoDays.indexOf(v.toISOString())] = o.tag + ":" + o.value
            // return matrix[currentIndex][isoDays.indexOf(v.toISOString())] = o.tag
        }, true);


        return o;
    });
    return matrix;
}

function buildCloud(matrix) {
    // console.log(matrix);
    var cloud = matrix.map(function (layer) {
        // console.log(layer);
        var newLayer = [];
        for (var i = 0; i < layer.length; i++) {
            var value = layer[i];
            var key = typeof value === 'undefined' ? '' : value;
            // console.log(key,value);
            // if first element or new
            if (newLayer.length < 1 || (newLayer[newLayer.length - 1].key !== key)) {
                newLayer.push({key: key, length: 1});
            } else {
                // else increment
                newLayer[newLayer.length - 1].length++;
            }
        }
        ;

        // console.log(newLayer);
        return newLayer;
    });
    return cloud;
}

function renderTable(cloud) {
    var table = cloud.reduce(function (table, layer, i) {
        var row = layer.reduce(function (row, item) {
            // get label and value > key => label:value
            var key = item.key.split(":");
            var label = key[0];
            var value = key[1];
            var distance = item.length;
            // font size => value
            // font weight => 1/distance
            // calc font size and weight
            var fontSize = size(value),
                fontWeight = weigth(distance);
            // console.log(fontSize);
            var cell = '<span style="font-size:' + fontSize + 'px;font-weight:' + fontWeight + '; ">' + item.key + '</span>';
            return row.concat('<th class="tag" colspan="', item.length, '">', cell, '</th>');
        }, '')

        if (i % 2 === 0) {
            $('#cloud').prepend('<tr>', row, '</tr>');
        } else {
            $('#cloud').append('<tr>', row, '</tr>');
        }
        table = table.concat('<tr>', row, '</tr>');
        return table
    }, '')
    // $('#cloud').append(table);
}

function size(value) {
    var minSize = 8,
        maxSize = 40;
    // console.log(maxValue);
    // var size = d3.scaleLinear()
    var d = d3.scaleLog()
    // var size = d3.scalePow()
        .domain([1, maxValue])
        // .domain([1,maxValue])
        .range([minSize, maxSize]);
    return d(value);
}

function weigth(size) {
    var d = d3.scaleLog()
        .base(2)
        .domain([1, 20])
        .range([900, 100]);
    // var t = d3.scaleQuantize()
    //     .domain([1,31])
    //     .range([900,800,700,600,500,400,300,200,100]);
    // console.log(size,d(size));
    return d(size);
};

function generateDates(start, end) {
    var days = [];
    for (var m = moment(start); m.isBefore(end); m.add('days', 1)) {
        // console.log(m.toISOString());
        days.push(moment(m.toISOString()));
    }
    return days;
}

// d3 cloud
function drawMiniCloud(tags) {
    $('#mini-cloud').show();
    d3.select("#mini-cloud").select('svg').remove();
    var minMax = tags.reduce(function (r, v) {
        if(!r[0]){
            r[0] = v.value;
        }
        if(!r[1]){
            r[1] = v.value;
        }
        if(v.value < r[0]){
            r[0] = v.value;
        }
        if(v.value > r[1]){
            r[1] = v.value;
        }
        return r;
    },[]);
    console.log(minMax);
    // var getSize = d3.scalePow()
    var getSize = d3.scaleLinear()
    // var getSize = d3.scaleLog()
        .domain(minMax)
        .range([6,26]);

    var w = document.getElementById('mini-cloud').offsetWidth;
    var h = document.getElementById('mini-cloud').offsetHeight;

    var fill = d3.scaleOrdinal(d3.schemeCategory20);
    // console.log(document.getElementById('mini-cloud'));
    var layout = cloud()
        .size([w, h])
        .words(tags.map(function(d) {
            return {text: d.key, size: d.value, test: "haha"};
        }))
        // .words([
        //     "Hello", "world", "normally", "you", "want", "more", "words",
        //     "than", "this"].map(function(d) {
        //     return {text: d, size: 10 + Math.random() * 90, test: "haha"};
        // }))
        // .padding(5)
        .rotate(function() {
            return 0;
            // return ~~(Math.random() * 2) * 45;
        })
        .font("Impact")
        .fontSize(function(d) { return getSize(d.size); })
        .on("end", draw);

    // console.log(tags);

    layout.start();

    function draw(words) {
        console.log(words);
        d3.select("#mini-cloud").append("svg")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Roboto")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
    }
}

function reset() {
    // console.log('reset');
    $('#interval').hide();
    $('#mini-cloud').hide();
    $('#cloud').empty();
    start(dataFile);
}
function toggleResize() {
    console.log('toggle resize');
}