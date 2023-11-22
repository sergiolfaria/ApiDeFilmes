import app from './app';
import createUser from './endpoints/createUser';
import login from './endpoints/login';
import editUser from './endpoints/editUser';
import getfilmes from './endpoints/GetFilme';
import createFilmes from './endpoints/CreateFilmes';
import updateFilmes from './endpoints/UpdateFilmes';
import deleteFilmes from './endpoints/DeleteUser';



app.post('/user/signup', createUser)
app.post('/user/login', login)
app.put('/user/edit', editUser)
app.get('/filmes',getfilmes)
app.post('/filmes',createFilmes )
app.put('/filmes/:id',updateFilmes)
app.delete('/filmes/:id',deleteFilmes) 


