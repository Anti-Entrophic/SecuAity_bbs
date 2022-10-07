// 用来存放已发送验证码，待检验的账号
let session = new Map();

//在signup.html界面，点击获取验证码
var fn_verification = async (ctx, next) => {
    console.log("----------");
    console.log("发送邮箱验证码");
    const nodemailer = require('nodemailer');

    const userEmail = '2436721347@qq.com';
    const transporter = nodemailer.createTransport({
        service: 'QQ',
        secureConnection: true,
        auth: {
            user: userEmail,
            pass: 'bicm*******jebji'  //这个是开启`POP3/SMTP/IMAP`的授权码
        }
    })

    //学号，例213*****018
    let Account = ctx.query.email.substring(0, 11);
    console.log(Account);
    
    // 生成四位验证码
    const code = Math.random().toString().slice(2,6);
    console.log("验证码为" + code);

    // 配置收件人信息
    const receiver = {
        // 发件人 邮箱  '昵称<发件人邮箱>'
        from: `"zyc"<2436721347@qq.com>`,
        // 主题
        subject: '发送邮箱验证码demo',
        // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
        to: `${ctx.query.email}`,
        // 可以使用html标签
        //有问题哦，这里可能邮箱不是学号开头，，，算了，再说吧。
        html: 
        `
        <div style="text-align: center">
            <h1>你好！用户${Account}</h1>
            <h2>欢迎来到SecurAity学生社区~（#￣▽￣#）</h2>
            <h2>您的验证码为</h2>
            <h1>${code}</h1>
            <h2>打死也不要告诉别人喵~</h2>
        </div>
        `
    }

    // 发送邮件 
    transporter.sendMail(receiver, (error, info) => {
        if (error) {
            return console.log('发送失败:', error);
        }
        transporter.close();
        console.log('发送成功:', info.response);
        //将“账号，验证码”保存进session
        session.set(Account, code);
    })
}

var fn_signup = async (ctx, next) => {
    console.log("----------");
    //从ctx.request.body中获取表单提交的内容
    //提交的账号和验证码
    let Account = ctx.request.body.Email.substring(0, 11) || '';
    let password = ctx.request.body.Password || '';
    console.log("账号：" + Account);
    console.log("验证码：" + password);
    
    //读取简易账号数据库
    const fs = require('mz/fs');
    //将json文件转化为一个JavaScript对象
    let data = JSON.parse(fs.readFileSync(__dirname + '/../data/Account.json', 'utf-8'));

    
    if(Account in data) {
        //输出该账号已注册
        ctx.render('alert.html', {
            header: "该账号已经注册过了捏",
            body: "不记得账号的话，可以点一下登录页面或注册页面的忘记密码哦"
        });
    }
    else {
        if (session.get(Account) === password) { //若验证码正确
            ctx.render('alert.html', {
                header: "哇你好棒棒！注册成功乐",
                body: "前面的区域，之后再来探索吧~  还有，初始密码即为你的学号，请尽快进入个人页面修改！"
            });
            //删掉本次使用完的验证码
            session.delete(Account);
            //将账号加入到简易数据库
            //难点在于不仅要写入json文件，还要写入json文件里面。想到的只有读入整个json文件，然后改变结构再把整个覆盖回去
            const { writeFile, readFile } = require('fs');
            const path = __dirname + '/../data/Account.json';

            readFile(path, (error, data) => {
            if (error) {
                console.log(error);
                return;
            }
            const parsedData = JSON.parse(data);
            parsedData[Account] = {"user_name": Account, 
                "password": Account
            };
            writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
                if (err) {
                console.log('Failed to write updated data to file');
                return;
                }
                console.log('Updated Account.json successfully');
            });
            });
        }
        else {
            ctx.render('alert.html', {
                header: "登录失败，快看看是不是你的验证码有问题！"
            });
        }
    }
}

module.exports = {
    'GET /send_email': fn_verification,
    'POST /signup': fn_signup
};
