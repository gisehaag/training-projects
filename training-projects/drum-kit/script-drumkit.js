class App {

    constructor () {
        this.container = document.querySelector('.keys');

        this.$key = this.container.querySelectorAll('.key');
        this.$sounds = document.querySelectorAll('audio');
        
        this.key = '';

        this.addEvent();   
    }
    
    addEvent() {
        document.addEventListener('keydown', this.getKey.bind(this));
    }
    
    getKey(e) {
        // Es mejor e.keyCode, para la próxima 😘 :* 8=====D
        // console.log(e.keyCode);
        
        this.key = e.key.toUpperCase().charCodeAt(0); 
        this.changeStyle();
        this.playSound();
    }

    changeStyle(){
        this.$key.forEach((element) =>{
            if(element.dataset.key == this.key) {
                element.classList.add('playing');
                element.addEventListener('transitionend', this.removeClassPlaying);                  
            }       
        })
    }

    removeClassPlaying(e){
        if(e.propertyName != 'transform') return;
        // en este caso el this hace referencia a sobre quien se llama el evento
        this.classList.remove('playing');
    }

    playSound(){
        this.$sound = document.querySelector(`audio[data-key='${this.key}']`);   

        if(!this.$sound) return;

        this.$sound.currentTime = 0; //rewind to the start    
        this.$sound.play();

        // yo lo habia hecho asi antes, andaba tambien, es más complicado
        // this.$sounds.forEach((element) =>{
        //     if(element.dataset.key == this.key) {
        //         element.play();
        //     }
        // })   
    }
}

let app = new App();

