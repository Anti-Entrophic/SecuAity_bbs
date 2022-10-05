//在signup.html界面，点击获取验证码
var fn_verification = async (ctx, next) => {
    console.log("发送邮箱验证码");
    const nodemailer = require('nodemailer')

    const userEmail = '2436721347@qq.com'
    const transporter = nodemailer.createTransport({
        service: 'QQ',
        secureConnection: true,
        auth: {
            user: userEmail,
            pass: '//这个是开启`POP3/SMTP/IMAP`的授权码，此处隐去。'  
        }
    })

    console.log(ctx.query.email);
     // 配置收件人信息
    const receiver = {
        // 发件人 邮箱  '昵称<发件人邮箱>'
        from: `"zyc"<2436721347@qq.com>`,
        // 主题
        subject: '发送邮箱验证码demo',
        // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
        to: `${ctx.query.email}`,
        // 可以使用html标签
        html: 
        `
        <h1>你好</h1>
        `
    }

     // 发送邮件 
    transporter.sendMail(receiver, (error, info) => {
        if (error) {
            return console.log('发送失败:', error);
        }
        transporter.close()
        console.log('发送成功:', info.response)
    })

}

module.exports = {
    'GET /send_email': fn_verification
};
