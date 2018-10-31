var jsonConcat = require('json-concat');
jsonConcat({
    src: "mock-data/data",
    dest: "mock-data/data.json",
    }, function(json){
    console.log(json);
});