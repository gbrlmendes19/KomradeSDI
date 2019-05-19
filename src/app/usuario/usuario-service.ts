import {Injectable}   from '@angular/core';
import {Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { Usuario, Endereco } from 'src/app/usuario/usuario.component';
import { Md5 } from 'ts-md5';


@Injectable()
export class UsuarioService {

    private userUrl = 'https://localhost:44355/usuario/';   
    private enderecoUrl = 'https://localhost:44355/endereco/';    
    
    usuarios: Usuario[]
    subscription: Subscription;
    constructor(private http: Http) { }

    getUsers() : Observable<Response>{
        return this.http.get(this.userUrl);
    }
    Login(email, password) : Observable<Response>{
        let options = new RequestOptions({ params: {'username': email, 'password': password}});
        return this.http.get(this.userUrl, options);
    }

    addUser(usuario: Usuario) {  
        usuario.senha = Md5.hashStr(usuario.senha).toString(); 
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.post(this.userUrl, usuario, options).subscribe((resposta) =>{
            alert(resposta.json().resposta);
        })
    }

    deleteUser(id: string) {             
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers});

        this.http.delete(this.userUrl + id, options).subscribe((resposta) =>{
            alert(resposta.json().resposta);
            window.location.reload();
        })
    }

    
    updateUser(usuario: Usuario, id) {          
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers});

        this.http.put(this.userUrl + id, usuario, options).subscribe((resposta) =>{
            alert(resposta.json().resposta);
        })
    }

     addEndereco(endereco: Endereco){
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.post(this.enderecoUrl, endereco, options).subscribe((resposta) =>{
            alert(resposta.json().resposta);
            window.location.reload();
        })
    }

    getEndereco(usuarioID) : Observable<Response>{
        let options = new RequestOptions();
        return this.http.get(this.enderecoUrl + usuarioID, options);
    }

    deleteEndereco(id) {             
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers});

        this.http.delete(this.enderecoUrl + id, options).subscribe((resposta) =>{
            alert(resposta.json().resposta);
            window.location.reload();
        })
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}