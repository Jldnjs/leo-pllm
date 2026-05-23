class AuthService:
    
    def login(self, email:str , password:str):
        if  email == "a@leopard.co.kr" and password == "1111":
            return {"success": True,
                    "message": "Login success",
                    "user":{
                        "email" : email,
                        "role" : "EMPLOYEE"
                    }}
        elif email == "b@leopard.co.kr" and password == "1111":
            return {"success": True,
                    "message": "Login success",
                    "user":{
                        "email" : email,
                        "role" : "ADMIN"
                    }}
        return {"success": False, "message": "Login failed"}