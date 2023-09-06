
let step_2=document.querySelector(".step_2");
let box_2=document.querySelector(".box_2");
let rpta_conjunto=document.querySelector(".rpta_conjunto");
let datos=document.querySelectorAll("input[type='text']");
let btn=document.querySelectorAll("button");
let spn=document.querySelectorAll("span");
const tabla_matriz=document.querySelector("tbody");

let rpta_reflexiva=document.querySelector(".rpta_reflexiva");
let rpta_antisimetrica=document.querySelector(".rpta_antisimetrica");


let capturar_datos;
let n_elementos=1;

let elementos_conjunto=[];
let elementos_relacion=[];
let elementos_matriz  =[];

btn[0].addEventListener("click",()=>{

    n_elementos=1;
    capturar_datos=datos[0].value;


    for (elemento of capturar_datos){
        if (elemento==","){
            n_elementos++;
        }
    }

    //  dicho elemento sigue siendo String
    elementos_conjunto=capturar_datos.split(",");
    console.log(elementos_conjunto);
    console.log(elementos_conjunto.length);

    if(elementos_conjunto[elementos_conjunto.length-1]==""){
        elementos_conjunto=elementos_conjunto.slice(0,-1);
        console.log(capturar_datos);
        capturar_datos=capturar_datos.slice(0,-1);
        console.log(capturar_datos);
    }

    for(let i=0;i<elementos_conjunto.length;i++){
        elementos_matriz.push([]);
    };


    if(elementos_conjunto.length>10 || elementos_conjunto.length<4){
        alert("Numero de parametros no permitido, debes ingresar entre 4 a 10 elementos");
    }
    else{
        spn[1].textContent=capturar_datos;
        step_2.classList.remove("ocultar_utility");
        rpta_conjunto.classList.remove("ocultar_utility");    
    }
    

    
    //window.scrollBy(0, 1000)
});



btn[2].addEventListener("click",()=>{
       
        elementos_relacion=[];
        datos[1].value="";

        let n_random=Math.floor(Math.random()*(10-4)+4);

        let n_random_2;
        for(let i=0; i<n_random*2;i++){
            n_random_2=Math.floor(Math.random()*((elementos_conjunto.length+1)-1)+1);
            elementos_relacion.push(n_random_2);
        }

        for(let i=0; i<elementos_relacion.length;i=i+2){
            let par_ordenado="("+elementos_relacion[i]+","+elementos_relacion[i+1]+")";
            if(i==0){
                datos[1].value+=par_ordenado;
            }
            else{
                datos[1].value+="," + par_ordenado;
            }
        }

});


btn[1].addEventListener("click",()=>{

    tabla_matriz.innerHTML="";
    capturar_datos=datos[1].value;

    elementos_relacion=capturar_datos.split(",");
    
    elementos_relacion=elementos_relacion.map((elemento_bruto)=>{
        for(digito of elemento_bruto){
            if(digito=="("){
                elemento_bruto=elemento_bruto.slice(1);
            }
            else if(digito==")"){
                elemento_bruto=elemento_bruto.slice(0,-1);
            }
        }
        return elemento_bruto;
    });

    for(let i=0;i<elementos_conjunto.length;i++){
        for(let j=0;j<elementos_conjunto.length;j++){
            for(let k=0; k<elementos_relacion.length;k=k+2){
                let par_ordenado="("+elementos_relacion[k]+","+elementos_relacion[k+1]+")";

                if(par_ordenado=="("+elementos_conjunto[i]+","+elementos_conjunto[j]+")"){
                    elementos_matriz[i][j]=1;
                    
                    break;
                }
                else{
                    elementos_matriz[i][j]=0;
                }
            }
        }
    };
            
        for(let i=0;i<elementos_conjunto.length;i++){
            
            let cascaron=document.createElement("tr");
            tabla_matriz.append(cascaron);

            let fila_html="";
            for(let j=0;j<elementos_conjunto.length;j++){
                fila_html=fila_html+ `
                               <td>${elementos_matriz[i][j]}</td>
                                `;
                
            }
           
            cascaron.innerHTML=fila_html;
            tabla_matriz.append(cascaron);
        }



    comprobar_reflexiva();
    comprobar_antisimetrica();

    box_2.classList.remove("ocultar_utility");




});




const comprobar_reflexiva=()=>{
    for(let i=0;i<elementos_conjunto.length;i++){
        if(elementos_matriz[i][i]==0){
            rpta_reflexiva.textContent="Es reflexiva: No";
            break;
        }
        else{
            rpta_reflexiva.textContent="Es reflexiva: Sí";
        }
    }
};

const comprobar_antisimetrica=()=>{

    let token=0;

    for(let i=0;i<elementos_conjunto.length;i++){
        for (let k = 0; k < elementos_conjunto.length; k++) {


            if((i!=k)&&(elementos_matriz[i][k]==elementos_matriz[k][i])){
                //console.log("Este elementos es un 1:"+i+"-"+k);
                if(elementos_matriz[i][k]==1){
                    console.log("Aumento de token");
                    token++;
                }
            }

        };
    };
    console.log(token);
    if(token>0){
        rpta_antisimetrica.textContent="Es antisimétrica: No";
    }
    else{
        rpta_antisimetrica.textContent="Es antisimétrica: Sí";
    }
};









