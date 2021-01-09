
export class movies{
    constructor(){
        this.links=document.querySelectorAll(".link");
        this.displayMovie=document.getElementById("display");
        this.rejexName=document.getElementById("name");
        this.rejexAge=document.getElementById("age");
        this.rejexEmail=document.getElementById("email");
        this.rejexPhone=document.getElementById("phone");
        this.rejexPassword=document.getElementById("password");
        this.rejexRePassword=document.getElementById("repassword");
        this.searchIncatagr=document.getElementById("search");
        this.searchInAllcatagr=document.getElementById("words");
        this.rejexBtn=document.getElementById("btns");
        this.newRespons=[];
        this.allCatageyMovies=[];
        this.openNav();
        this.clossNev();
        this.fatchMovies("movie/now_playing");
        for(let i=0;i<this.links.length;i++) {
            this.links[i].addEventListener("click", (e)=>{
                this.fatchMovies(e.target.id),
                this.displayMovies(this.newRespons);
            });
        };
        this.fatchAllMovies();
        this.rejexName.onkeyup=()=>{this.validtionName(),this.validtionBtn();}
        this.rejexAge.onkeyup=()=>{this.validtionAge(),this.validtionBtn();}
        this.rejexEmail.onkeyup=()=>{this.validtionEmail(),this.validtionBtn();}
        this.rejexPhone.onkeyup=()=>{this. validtionPhone(),this.validtionBtn();}
        this.rejexPassword.onkeyup=()=>{this. validtionPassword(),this.validtionBtn();}
        this.rejexRePassword.onkeyup=()=>{this. validtionRePassword(),this.validtionBtn();}
        this.searchIncatagr.onkeyup=(e)=>{this.searchInCatagr(e.target.value)}
        this.searchInAllcatagr.onkeyup=(e)=>{this.searchInAllMovies(e.target.value)}
        
        
    }
    async fatchMovies(api){
        let movies=await fetch(`https://api.themoviedb.org/3/${api}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
        let Respons=await movies.json();
        this.newRespons= Respons.results;
        this.displayMovies(this.newRespons);
    }
    displayMovies(movies){
        let allMovies=``;
        for(let i=0;i<movies.length;i++) {
            allMovies+=` 
        <div class="col-md-6 col-lg-4 my-3">
            <div class="h-100 overflow-hidden position-relative">
                <img src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" class="img-fluid" alt="">
                <div class="overlay w-100 h-100 position-absolute d-flex flex-column justify-content-center text-center align-items-center">
                    ${movies[i].title==undefined?`<h2>${movies[i].name}</h2>`:`<h2>${movies[i].title}</h2>`}
                    <p>${movies[i].overview}</p>
                    <span>rate: ${movies[i].vote_average}</span>
                    ${movies[i].release_date==undefined?`<span>${movies[i].first_air_date}</span>`:`<span>${movies[i].release_date}</span>`}
                </div>
            </div>
        </div>`
        }
        this.displayMovie.innerHTML = allMovies;
    }
    openNav() {
        let width=$(".inside").outerWidth();
        $("#side-bar").css("left", -width);
        $(".times").click(function(){
            $(this).css("display", "none");
            $(".fa-times").css("display", "inline");
            $("#side-bar").animate({left: 0}, 500);
            $(".anmat").animate({opacity: 1, paddingTop: 25}, 1000)
        });
    }
    clossNev(){
        let width=$(".inside").outerWidth();
        $(".fa-times").click(function(){
            $(this).css("display", "none");
            $(".times").css("display", "inline");
            $("#side-bar").animate({left: -width}, 500);
            $(".anmat").animate({opacity: 0, paddingTop: 500}, 500)
        })
    }
    validtionName(){
        let validName=/^[A-Z][a-z]{2,7}$/
        if(!validName.test(this.rejexName.value)) {
            $(".name").slideDown(500);
            return false;
        }else{
            $(".name").slideUp(500);
            return true;
        }
    }
    validtionEmail(){
        let validEmail=/(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!validEmail.test(this.rejexEmail.value)) {
            $(".email").slideDown(500);
            return false;
        }else{
            $(".email").slideUp(500);
            return true;
        }
    }
    validtionPhone(){
        let validPhone=/^01[0125][0-9]{8}$/
        if(!validPhone.test(this.rejexPhone.value)) {
            $(".phone").slideDown(500);
            return false;
        }else{
            $(".phone").slideUp(500);
            return true;
        }
    }
    validtionAge(){
        let validAge=/^([1-9][0-9]|100)$/
        if(!validAge.test(this.rejexAge.value)) {
            $(".age").slideDown(500);
            return false;
        }else{
            $(".age").slideUp(500);
            return true;
        }
    }
    validtionPassword(){
        let validPassword=/^[a-zA-Z]{3,}[0-9]{2,}/
        if(!validPassword.test(this.rejexPassword.value)) {
            $(".password").slideDown(500);
            return false;
        }else{
            $(".password").slideUp(500);
            return true;
        }
    }
    validtionRePassword(){
        if(this.rejexRePassword.value == this.rejexPassword.value) {
            $(".repassword").slideUp(500);
            return true;
        }else{
            $(".repassword").slideDown(500);
            return false;
        }
    }
    validtionBtn(){
        if(this.validtionName()==true&&this.validtionEmail()==true&&this.validtionPhone()==true&&this.validtionAge()==true&&this.validtionPassword()==true&&this.validtionRePassword()==true ) {
            this.rejexBtn.removeAttribute("disabled");
        }else {
            this.rejexBtn.disabled="true";
        }
    }
    searchInCatagr(value){
        let movie=``;
        for(let i=0;i<this.newRespons.length;i++){
            let move;
            if(this.newRespons[i].title==undefined) {
                move=this.newRespons[i].name;
            }else {
                move=this.newRespons[i].title;
            }
            if(move.toLowerCase().includes(value.toLowerCase())){
                movie+=` 
                <div class="col-md-6 col-lg-4 my-3">
                    <div class="h-100 overflow-hidden position-relative">
                        <img src="https://image.tmdb.org/t/p/w500${this.newRespons[i].poster_path}" class="img-fluid" alt="">
                        <div class="overlay w-100 h-100 position-absolute d-flex flex-column justify-content-center text-center align-items-center">
                            <h2>${move}</h2>
                            <p>${this.newRespons[i].overview}</p>
                            <span>rate: ${this.newRespons[i].vote_average}</span>
                            ${this.newRespons[i].release_date==undefined?`<span>${this.newRespons[i].first_air_date}</span>`:`<span>${this.newRespons[i].release_date}</span>`}
                        </div>
                    </div>
                </div>`
            } 
        }
        this.displayMovie.innerHTML = movie;
    }
    async fatchAllMovies(){
        let oneCatagrey= await fetch(`https://api.themoviedb.org/3/search/movie?query="+e+"&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false`);
        let ResponsOne=await oneCatagrey.json();
        let twoCatagrey=await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
        let Responstwo=await twoCatagrey.json();
        let threeCatagrey=await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
        let Responsthree=await threeCatagrey.json();
        let fourCatagrey=await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
        let Responsfour=await fourCatagrey.json();
        let fiveCatagrey=await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
        let Responsfive=await fiveCatagrey.json();
        let sixCatagrey=await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
        let Responssix=await sixCatagrey.json();
        this.allCatageyMovies=[
            ...ResponsOne.results,
            ...Responstwo.results,
            ...Responsthree.results,
            ...Responsfour.results,
            ...Responsfive.results,
            ...Responssix.results,
        ];
    }
    searchInAllMovies(allValue){
        let allMovies=``;
        for(let i=0;i<this.allCatageyMovies.length;i++) {
            let move;
            if(this.allCatageyMovies[i].title==undefined){
                move=this.allCatageyMovies[i].name;
            }else{
                move=this.allCatageyMovies[i].title;
            }
            if(move.toLowerCase().includes(allValue.toLowerCase())){
                allMovies+=` 
                <div class="col-md-6 col-lg-4 my-3">
                    <div class="h-100 overflow-hidden position-relative">
                        <img src="https://image.tmdb.org/t/p/w500${this.allCatageyMovies[i].poster_path}" class="img-fluid" alt="">
                        <div class="overlay w-100 h-100 position-absolute d-flex flex-column justify-content-center text-center align-items-center">
                            <h2>${move}</h2>
                            <p>${this.allCatageyMovies[i].overview}</p>
                            <span>rate: ${this.allCatageyMovies[i].vote_average}</span>
                            ${this.allCatageyMovies[i].release_date==undefined?`<span>${this.allCatageyMovies[i].first_air_date}</span>`:`<span>${this.allCatageyMovies[i].release_date}</span>`}
                        </div>
                    </div>
                </div>`
            } 
        }
        this.displayMovie.innerHTML = allMovies;
    }
}