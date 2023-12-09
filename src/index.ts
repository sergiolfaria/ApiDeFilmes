import app from './app';
import createUser from './endpoints/createUser';
import login from './endpoints/login';
// import editUser from './endpoints/editUser';
import getfilmes from './endpoints/GetFilme';
import createFilmes from './endpoints/CreateFilmes';
import updateFilmes from './endpoints/UpdateFilmes';
import deleteFilmes from './endpoints/Deletefilmes';



app.post('/user/signup', createUser)
app.post('/user/login', login)
app.get('/filmes',getfilmes)
app.get('/filmes/:id',getfilmes)
app.post('/filmes',createFilmes )
app.patch('/filmes/:id',updateFilmes)
app.delete('/filmes/:id',deleteFilmes) 


