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
};
