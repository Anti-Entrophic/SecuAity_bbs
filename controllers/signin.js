//提交登录信息
var fn_signin = async (ctx, next) => {
    console.log("now do fn_signin");
    var
        Email = ctx.request.body.Email || '',
        Password = ctx.request.body.Password || '';
    console.log(`signin with name: ${Email}, password: ${Password}`);
    if (Email === 'koa@123' && Password === '12345') {
        ctx.response.body = `<h1>Welcome, ${Email}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/signin">Try again</a></p>`;
    }
};

//在signin.html界面，点击注册，跳转到注册页面
var fn_signup = async (ctx, next) => {
    console.log("someone is going to signup");
    ctx.render('signup.html', {
        
    });
}

module.exports = {
    'POST /signin': fn_signin,
    'GET /signup': fn_signup
};
