//gmailのセキュリティチェックを、あらかじめ外しておくこと。
//通常と違う端末からのアクセスを許す。不確かなアプリからのアクセスを有効にする。二段階認証はOFFに。
//https://support.google.com/accounts/answer/6009563?vid=1-635762560052965216-324165554

    //global
    var myEmailAddressForTest = 'user@gmail.com';
    var myEmailPasswordForTest = '***********';

    // test.js  
    if (Meteor.isClient) {  
      Template.test.events({  
        'click [type="button"]':function(){  
          var dateTime = new Date();  
          console.log(dateTime);  
          Meteor.call('sendMail',dateTime);  
        }  
      });  
      
    }  
      
    if (Meteor.isServer) {  
      
      Meteor.startup(function () {  
        var gmailAccount = {'eml':myEmailAddressForTest,'pwd':myEmailPasswordForTest};  
        //var st = 'smtp://' + encodeURIComponent(gmailAccount.eml) + ':' + gmailAccount.pwd + '@smtp.gmail.com' + ':25/'; check(st,String);  
        //var st = 'smtp://' + encodeURIComponent(gmailAccount.eml) + ':' + gmailAccount.pwd + '@smtp.gmail.com' + ':587/'; check(st,String);  
        var st = 'smtp://' + encodeURIComponent(gmailAccount.eml) + ':' + gmailAccount.pwd + '@smtp.gmail.com' + ':465/'; check(st,String);  
        process.env.MAIL_URL = st;  
      });  
      
      Meteor.methods({  
        'sendMail':function(dateTime){  
          var to = myEmailAddressForTest; check(to,String);  
          var from = to;
          var subject = 'test'; check(subject,String);  
          var text = 'Time:' + dateTime; check(text,String);  
          var sendObj = {'to':to, 'from':from, 'Reply-To':from, 'subject':subject, 'text':text};  
          Email.send(sendObj);  
        }  
      });  
      
    }  
