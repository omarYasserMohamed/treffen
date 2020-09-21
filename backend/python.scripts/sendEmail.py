import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import os
import sys

def sendEmailNow(recieverMail , secNum , firstname):
	sender = "treffencode@gmail.com"
	password = "Starboy1477"
	reciever = recieverMail
	subject = "please verify your Email address"
	body = "Hey " + firstname + ", \n\n WECLOME TO TREFFEN \n\n you are just one step away from completing your sign up process \n\n your email verification code is  " + secNum + " \n \n \n we wish that you have fun with our meetings \n\n yours, \n Treffen Team"
	
	sendEmail(sender , password , reciever , subject , body , '0')

    


def sendEmail(sender , password , reciever , subject1 , body1 , file):
	try:
		email_user = sender
		email_password = password
		email_send = reciever
		subject = subject1
		msg = MIMEMultipart()
		msg['From'] = email_user
		msg['To'] = email_send
		msg['Subject'] = subject
		body = body1
		msg.attach(MIMEText(body,'plain'))
		if(file != '0'):
			try:
				filename= file
				attachment  =open(filename,'rb')
				part = MIMEBase('application','octet-stream')
				part.set_payload((attachment).read())
				encoders.encode_base64(part)
				part.add_header('Content-Disposition', 'attachment; filename="%s"'% os.path.basename(filename))
				msg.attach(part)
			except:
				print('invalid directory when you do not want to attach a file enter "0" when you are asked to enter a directory')	

		text = msg.as_string()
		server = smtplib.SMTP('smtp.gmail.com',587)
		server.starttls()
		server.login(email_user,email_password)
		server.sendmail(email_user,email_send,text)
		server.quit()
		print('mail sent')
		return True
	except:
		print('mail not sent')
		print('wrong mail or password')
		print('please check your entered data and try again')
		return False

sendEmailNow(sys.argv[1] , sys.argv[2] , sys.argv[3])
