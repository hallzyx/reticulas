
let step_2=document.querySelector(".step_2");
let box_2=document.querySelector(".box_2");
let rpta_conjunto=document.querySelector(".rpta_conjunto");
let datos=document.querySelectorAll("input[type='text']");
let btn=document.querySelectorAll("button");
let spn=document.querySelectorAll("span");
const tabla_matriz=document.querySelector("tbody");

let rpta_reflexiva=document.querySelector(".rpta_reflexiva");
let rpta_antisimetrica=document.querySelector(".rpta_antisimetrica");
let rpta_transitiva=document.querySelector(".rpta_transitiva");
let rpta_ordenParcial=document.querySelector(".rpta_ordenParcial");

let capturar_datos;
let n_elementos=1;

let elementos_conjunto=[];
let elementos_relacion=[];
let elementos_matriz  =[];
let elementos_matriz_prueba=[]

let maincavas=document.querySelector("#main-canvas");
let ctx=maincavas.getContext("2d");

let x,y;
let x1,y2;


btn[0].addEventListener("click",()=>{


    elementos_matriz  =[];
    elementos_matriz_prueba=[];

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
        elementos_matriz_prueba.push([]);
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
                console.log(par_ordenado);
                console.log("("+elementos_conjunto[i]+","+elementos_conjunto[j]+")");
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
    comprobar_transitiva();

    comprobar_ordenParcial();
    box_2.classList.remove("ocultar_utility");



    //Transformando a diagrama de hasse matriz
    

    let matriz_hasse=elementos_matriz.slice();
    let matriz_hasse_prueba=[];
    let matriz_hasse_definitivo=elementos_matriz.slice();

    for(let i=0;i<elementos_conjunto.length;i++){
        matriz_hasse[i][i]=0;
    }

    console.log(matriz_hasse);


    for(let i=0;i<elementos_conjunto.length;i++){
        matriz_hasse_prueba.push([]);
    };


        for(let i=0;i<elementos_conjunto.length;i++){
                
            for (let j = 0; j < elementos_conjunto.length; j++) {
                let token=0;
                for (let k = 0; k < elementos_conjunto.length; k++) {
                    if(matriz_hasse[i][token+k]==matriz_hasse[token+k][j] && matriz_hasse[i][token+k]==1){
                        matriz_hasse_prueba[i][j]=1;
                        break;
                    }
                    else{
                        matriz_hasse_prueba[i][j]=0;
                    }
                    //token++;
                }
                
            };
        };
    
    console.log(matriz_hasse_prueba);  

    for(let i=0;i<elementos_conjunto.length;i++){
                
        for (let j = 0; j < elementos_conjunto.length; j++) {
            
            if(matriz_hasse_prueba[i][j]==1){
                matriz_hasse_definitivo[i][j]=0;
            }
            
        };
    };

    console.log(matriz_hasse_definitivo);
    let diccionario_relaciones={};
    let token_ordenamiento=[];
    for(let llave of elementos_conjunto){
        diccionario_relaciones[llave]=0;
    }


    for(let i=0;i<elementos_conjunto.length;i++){
                
        for (let j = 0; j < elementos_conjunto.length; j++) {
            
            if(matriz_hasse_definitivo[i][j]==1){
                diccionario_relaciones[elementos_conjunto[j]]++;
            }
            
        };
    };

    token_ordenamiento=Object.entries(diccionario_relaciones);
    token_ordenamiento.sort((a, b) => b[1] - a[1]);
    
    
   

    console.log(diccionario_relaciones);
    console.log(token_ordenamiento);

    ctx.clearRect(0, 0, maincavas.width, maincavas.height);

    draw(token_ordenamiento, n_elementos);

});




const draw=(token_ordenamiento, n_elementos)=>{

    let x1;
    let y1;

    let x2;
    let y2;

    let x3;
    let y3;
    
    let x4;
    let y4;

    let x5;
    let y5;

    let x6;
    let y6;


    switch (n_elementos) {
        case 4:
            // Establece el color y grosor de la línea
            ctx.strokeStyle = "rgb(255, 176, 227)";
            ctx.lineWidth = 2;

            ctx.font = '20px Arial'; // Establecer la fuente y el tamaño de fuente
            ctx.fillStyle = 'white'; // Color del texto
            ctx.textAlign = 'center'; // Alineación horizontal del texto (centro)
            
            x1 = 200;
            y1 = 70;
        
            x2 = 120;
            y2 = 150;
        
            x3 = 200;
            y3 = 230;
            
            x4 = 280;
            y4 = 150;

            // Dibuja la línea
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.lineTo(x4, y4);
            ctx.lineTo(x1, y1);
            ctx.stroke();

            ctx.fillStyle = "rgb(255, 176, 227)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x1, y1, 5, 0, 2 * Math.PI);
            ctx.fill();
            
            // Alineación vertical del texto (medio)
            ctx.textBaseline = 'bottom';
            ctx.fillText(token_ordenamiento[0][0], x1, y1 - 5 - 5);

            ctx.beginPath();
            ctx.arc(x2, y2, 5, 0, 2 * Math.PI);
            ctx.fill();


            ctx.fillText(token_ordenamiento[1][0], x2 -5 -15, y2 +5 +5);

            ctx.beginPath();
            ctx.arc(x3, y3, 5, 0, 2 * Math.PI);
            ctx.fill();

            ctx.textBaseline = 'top';
            ctx.fillText(token_ordenamiento[3][0], x3, y3 +5 +5);


            ctx.beginPath();
            ctx.arc(x4, y4, 5, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillText(token_ordenamiento[2][0], x4 +5 +15, y4 -5 -5);
    
            break;
    
        case 6:
            ctx.strokeStyle = "rgb(255, 176, 227)";
            ctx.lineWidth = 2;

            ctx.font = '20px Arial'; // Establecer la fuente y el tamaño de fuente
            ctx.fillStyle = 'white'; // Color del texto
            ctx.textAlign = 'center'; // Alineación horizontal del texto (centro)

            x1 = 200;
            y1 = 50;
        
            x2 = 120;
            y2 = 130;
        
            x3 = 120;
            y3 = 210;

            x4 = 200;
            y4 = 290;
            
            x5 = 280;
            y5 = 210;

            x6 = 280;
            y6 = 130;
  
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.lineTo(x4, y4);
            ctx.lineTo(x5, y5);
            ctx.lineTo(x6, y6);
            ctx.lineTo(x1, y1);
            ctx.stroke();

            ctx.fillStyle = "rgb(255, 176, 227)";
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.arc(x1, y1, 5, 0, 2 * Math.PI);
            ctx.fill();
            
            // Alineación vertical del texto (medio)
            ctx.textBaseline = 'bottom';
            ctx.fillText(token_ordenamiento[0][0], x1, y1 - 5 - 5);

            ctx.beginPath();
            ctx.arc(x2, y2, 5, 0, 2 * Math.PI);
            ctx.fill();


            ctx.fillText(token_ordenamiento[1][0], x2 -5 -15, y2 +5 +5);

            ctx.beginPath();
            ctx.arc(x3, y3, 5, 0, 2 * Math.PI);
            ctx.fill();


            ctx.fillText(token_ordenamiento[3][0], x3 -5 -15, y3 +5 +5);


            ctx.beginPath();
            ctx.arc(x4, y4, 5, 0, 2 * Math.PI);
            ctx.fill();

            ctx.textBaseline = 'top';
            ctx.fillText(token_ordenamiento[5][0], x4, y4 +5 +5);


            ctx.beginPath();
            ctx.arc(x5, y5, 5, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillText(token_ordenamiento[4][0], x5 +5 +15, y5 -5 -5);
            
            ctx.beginPath();
            ctx.arc(x6, y6, 5, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillText(token_ordenamiento[2][0], x6 +5 +15, y6 -5 -5);



        default:
            break;
    }




    

    
};



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

const comprobar_transitiva=()=>{
    
    let token=0;
    for(let i=0;i<elementos_conjunto.length;i++){
            
        for (let j = 0; j < elementos_conjunto.length; j++) {
            let token=0;
            for (let k = 0; k < elementos_conjunto.length; k++) {
                if(elementos_matriz[i][token+k]==elementos_matriz[token+k][j] && elementos_matriz[i][token+k]==1){
                    elementos_matriz_prueba[i][j]=1;
                    break;
                }
                else{
                    elementos_matriz_prueba[i][j]=0;
                }
                //token++;
            }
            
        };
    };
    console.log(elementos_matriz);
    console.log(elementos_matriz_prueba)

   if(comparar_matrices()){
    rpta_transitiva.textContent="Es transitiva: Sí";
   }
   else{
    rpta_transitiva.textContent="Es transitiva: No";
   }
   
};

const comparar_matrices=()=>{
    for(let i=0;i<elementos_conjunto.length;i++){
        for (let k = 0; k < elementos_conjunto.length; k++) {

            if(elementos_matriz[i][k]!=elementos_matriz_prueba[i][k]){
                return false;
            }
            
        };
    };

    return true;
};

const comprobar_ordenParcial=()=>{
    console.log(rpta_reflexiva.textContent=="Es reflexiva: Sí");
    console.log( rpta_antisimetrica.textContent=="Es antisimétrica: Sí");
    console.log(rpta_transitiva.textContent=="Es transitiva: Sí");
    console.log(rpta_ordenParcial.textContent);
    if(rpta_reflexiva.textContent=="Es reflexiva: Sí" &&
        rpta_antisimetrica.textContent=="Es antisimétrica: Sí" &&
        rpta_transitiva.textContent=="Es transitiva: Sí"){
            rpta_ordenParcial.textContent="Es de orden parcial: Sí";
        }
        else{
            rpta_ordenParcial.textContent="Es de orden parcial: No";
        }
};









