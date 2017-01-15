var User = require('../models/user').User;
var Massage = require('../models/massage').Massage;

exports.get = function(req, res, next){ 
	var product=req.params.id;
	var id=req.session.user;

	var users={};
	var massage={};
	
	//��������� ��� ���������� ������ 
	Massage.find({productid:product},function(err,massage){if(err){
		res.render('error',{status:'err', message:err});
	}
	else{
		res.render('predlog',{status:'ok', messages:massage });
	}}).sort({date:-1});
}

exports.post = function(req, res, next){ 
	var product=req.params.id;
	var q=req.body;
	var id=req.session.user;
	
	var users={};
	var massage={};
	
	//���� ������������ �� �������������, �� ������� �� �������� �����������
	if(id!=undefined){
		//����� ������������ ������� ������
		User.findById(id, function(err, users) { 
			if(err){
				res.render('error',{status:'err', message:err});
			}
			else{
				 //�������� ������ ���������
				 var newMess = new Massage();
				// ��������� ����������
                newMess.username = users.username;
                newMess.sender = id;
                newMess.productid = product;
                newMess.text = q.message;
               
                // ���������� ���������
                newMess.save(function(err){
                    if (err){
						//������ ���������� ���������                    
                        res.render('error',{status:'err', message:err});
                    }
					else{
						//����� ��� ��������� ��� ������� ������
						//������������ ��������
						Massage.find({productid:product}, function(err, massage){
							if(err) {
								res.render('error',{status:'err', message:err});
							}
							else{
								//��������� ������� ��������� � ��  
								res.render('predlog',{status:'ok', messages:massage}); 
							}
						}).sort({date:-1});
					};
				});
			}
		});
	}
	else{
		res.render('login',{status:'id undefined'});
	}
}