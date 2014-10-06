
/* файл для запуска локального сервера на nodejs */

var http = require('http');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || 3000);