import flota from './jsons/flota.json' assert {type: 'json'};

// Info Flota
for (var i = 0; i < flota.aeronaves.length; i++) {
    var aeronave = flota.aeronaves[i].nombre;
    document.querySelector("."+aeronave+".matricula").textContent = flota.aeronaves[i].matricula;
    document.querySelector("."+aeronave+".motor").textContent = flota.aeronaves[i].motor;
    document.querySelector("."+aeronave+".marca").textContent = flota.aeronaves[i].marca;
    document.querySelector("."+aeronave+".modelo").textContent = flota.aeronaves[i].modelo;
    document.querySelector("."+aeronave+".velocidad").textContent = flota.aeronaves[i].velocidad;
    document.querySelector("."+aeronave+".consumo").textContent = flota.aeronaves[i].consumo;
}