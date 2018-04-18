const cloud = require("./libs/d3.layout.cloud");
const color = d3.scaleOrdinal(d3.schemeCategory20);
// global values
const stopwords = ['milton', 'keynes', 'mk'];
const node = '#cloud';
const hash = function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};

// global variables
var dataFile = null;
var dataSource = null;
var dataMiniCloud = null;
var maxValue = 1;
var matrixIDs = null;

$.ajax({
    url: "/dataset/citibeats.csv",
    success: function (result) {
        start($.csv.toObjects(result));
    }
});


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

    $('.tag').each(function () {
       $(this).click(function (e) {
           console.log(e.target.attributes);

       });
    });

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
                $(this).addClass('downlight');
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
            var hightlightIDs = [];
            // building list of days to highlight
            for(var i = 0; i < delta; i++){
                var day = start.add(Math.min(i,1),'d').toISOString();
                highlightDays.push(day);
                // set tic style
                $('th[value="'+day+'"').removeClass('downlight');
                $('th[value="'+day+'"').addClass('highlight');

                var index = daysIndexes.indexOf(day);
                // console.log(index);
                // get the relevant tags
                var IDs = matrixIDs.reduce(function (IDs, layer) {
                    if(layer[index] === null){return IDs;}
                    return IDs.concat(layer[index]);
                },[]);
                // console.log(IDs);
                hightlightIDs = hightlightIDs.concat(...IDs);
                var tags = matrix.reduce(function (tags, layer, i) {
                    if( typeof layer[index] === 'undefined'){return tags;}
                    return tags.concat(layer[index]);
                }, []);
                // console.log(tags);
                miniCloud = miniCloud.concat(...tags);
                // highlight tags
                setStyle(hightlightIDs);
            }
            // console.log(highlightDays);
            miniCloud = miniCloud.reduce(function (r,v) {
                var text = v.split(':')[0].toLowerCase().trim();
                // var text = v.toLowerCase().trim();
                var size = dataSource.reduce(function (val, t) {
                    // if(t.text === text || t.text === 'rough sleepers')
                    //     console.log(t.text, text,t.day,highlightFrom, t.day >= highlightFrom, t.day <= highlightTo);
                    if(t.text === text && t.day >= highlightFrom && t.day <= highlightTo){
                        val += t.size;
                    }
                    return val;
                },0);
                var i = r.map(function (value) { return value.key }).indexOf(text);
                // console.log(text, i);
                if(i < 0){
                    return r.concat({key:text,value:size});
                }
                r[i].value = size;
                return r;
            },[]);
            // console.log(miniCloud.map(function (value) { return Object.assign({},value); }));
            dataMiniCloud = Array.from(miniCloud);
            drawMiniCloud(miniCloud);
        });
    });
}

function setStyle(highlights) {
    console.log('highlights',highlights);
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
    // $('.tag').each(function () {
    //     var tag = $(this).prop('id');
    // });
    // set style
    highlights.forEach(function (id) {
        // console.log(id);
        // console.log($('#'+id));
        $('#'+id).addClass('highlight');
        $('#'+id).removeClass('downlight');
    });
    // $('.tag').each(function () {
    //     var tag = $(this).prop('id');
    //     console.log(tag);
    //     // console.log('setting',tag,highlights,highlights.indexOf(tag));
    //     // if tag included in the highlights list
    //     if(highlights.indexOf(tag) > -1 ){
    //         $(this).addClass('highlight');
    //         $(this).removeClass('downlight');
    //     }
    // });
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
    matrixIDs = [];
    // console.log(matrix);
    var cloud = matrix.map(function (layer, j) {
        // console.log(layer);
        var newLayer = [];
        matrixIDs[j] = [];
        for (var i = 0; i < layer.length; i++) {
            var value = layer[i];
            var key = typeof value === 'undefined' ? '' : value;
            // console.log(key,value);
            // if first element or new
            if (newLayer.length < 1 || (newLayer[newLayer.length - 1].key !== key)) {
                var id = hash(key+':'+Math.random());
                matrixIDs[j][i] = id;
                newLayer.push({key:key, tag:key.split(":")[0], value:key.split(":")[1], length: 1, id });
            } else {
                matrixIDs[j][i] = matrixIDs[j][i-1];
                // else increment
                newLayer[newLayer.length - 1].length++;
            }
        };
        // console.log(newLayer);
        return newLayer;
    });
    console.log(cloud);
    return cloud;
}

function renderTable(cloud) {
    var table = cloud.reduce(function (table, layer, i) {
        var row = layer.reduce(function (row, item) {
            var distance = item.length;
            // font size => value
            // font weight => 1/distance
            // calc font size and weight
            var fontSize = size(item.value),
                fontWeight = weigth(distance);
            // console.log(fontSize);
            var color = getRandomColor();
            var cell = '<span value="'+item.value+'" style="font-size:' + fontSize + 'px;font-weight:' + fontWeight + '; ">' + item.tag + '</span>';
            // var cell = '<span style="font-size:' + fontSize + 'px;font-weight:' + fontWeight + '; ">' + label + '</span>';
            return row.concat('<th id="'+item.id+'"  style="color:'+color+'" class="tag" colspan="', item.length, '">', cell, '</th>');
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
    // console.log(minMax);
    var big = $('#mini-cloud').hasClass('full-size');
    // var getSize = d3.scalePow()
    var getSize = d3.scaleLinear()
    // var getSize = d3.scaleLog()
        .domain(minMax)
        .range(big?[20,120]:[6,26]);

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

    // $('#mini-cloud').empty();
    $('#mini-cloud').toggleClass('full-size');
    drawMiniCloud(dataMiniCloud);
}

function getRandomColor() {

    var min = 0;
    var max = 200;
    var rand = Math.floor(Math.random() * (max - min + 1)) + min;
    // console.log(rand, color(rand), d3.schemeCategory20, color);
    return color(rand);
}