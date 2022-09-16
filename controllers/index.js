var fn_signin = async (ctx, next) => {
    console.log("now do fn_signin");
    var
        Email = ctx.request.body.Email || '',
        Password = ctx.request.body.Password || '';
    console.log(`signin with name: ${Email}, password: ${Password}`);
    if (Email === 'koa' && Password === '12345') {
        ctx.response.body = `<h1>Welcome, ${Email}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/signin">Try again</a></p>`;
    }
};

//按下进入SecurAity学生社区，跳转到登录页面（尚未添加cookie校验）
var fn_gotoSignin = async (ctx, next) => {
    ctx.render('signin.html', {
        
    });
}

var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        
    });
}

module.exports = {
    'GET /': fn_index,
    'GET /signin': fn_gotoSignin,
    'POST /signin': fn_signin
};
