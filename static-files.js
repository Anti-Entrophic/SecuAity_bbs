const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

//调用的时候：staticFiles('/static/', __dirname + '/static')
function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        //判断URL是否以指定前缀开头
        if (rpath.startsWith(url)) {
            //Node.js自带模块path，获取文件完整路径
            let fp = path.join(dir, rpath.substring(url.length));
            //判断文件是否存在:
            if (await fs.exists(fp)) {
                //mine是互联网的一个标准，规定了如何处理接受文件，获取包括'text/css'，'application/javascript'等等这些type就是这句代码的目的
                ctx.response.type = mime.lookup(rpath);
                ctx.response.body = await fs.readFile(fp);
            } else {
                ctx.response.status = 404;
            }
        } else { //如果不是，直接调用await next()让下一个middleware处理请求
            await next();
        }
    };
}

module.exports = staticFiles;
