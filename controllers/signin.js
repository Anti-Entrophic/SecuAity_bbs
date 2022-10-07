//提交登录信息
var fn_signin = async (ctx, next) => {
    var
        Account = ctx.request.body.Email.substring(0, 11) || '',
        Password = ctx.request.body.Password || '';
    console.log(`signin with name: ${Account}, password: ${Password}`);

    //读取简易账号数据库
    const fs = require('mz/fs');
    //将json文件转化为一个JavaScript对象
    let data = JSON.parse(fs.readFileSync(__dirname + '/../data/Account.json', 'utf-8'));

    if (Account in data && data[Account].password === Password) {
        ctx.render('alert.html', {
            header: "欢迎",
            body: `用户${Account}`
        });
    } else {
        ctx.render('alert.html', {
            header: "登录失败，该账号不存在"
        });
    }
};

//在signin.html界面，点击注册，跳转到注册页面
var fn_signup = async (ctx, next) => {
    ctx.render('signup.html', {
        
    });
}

module.exports = {
    'POST /signin': fn_signin,
    'GET /signup': fn_signup
};
