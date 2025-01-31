const http = require("http");
const server = http.createServer((req,res)=>{
    const url = req.url
    const method = req.method 
    const body =[]


const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ];
  
    
    if(url == '/home' && method =='POST'){
      res.setHeader('contemt-Type','text/html')
      res.write('hello in post method')
      res.end()

    }else if(url == '/home' && method =='GET'){
      res.setHeader('contemt-Type','text/html')
      res.write('hello in get method')
      res.end()

    }else if(url == '/user' && method =='GET'){
      res.setHeader('contemt-Type',"application/json")
      res.end(JSON.stringify(users));

    }else if(url == '/user' && method =='POST'){
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)

        });
      
          req.on('end', () => {
            const newUser = JSON.parse(body);
            users.push(newUser);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'User added successfully', user: newUser }));
          });
        } else {
          res.setHeader('Content-Type', 'text/html');
          res.end('Not Found');
        }
    

    
});


server.listen(3000,()=>{
    console.log('connected..')
});