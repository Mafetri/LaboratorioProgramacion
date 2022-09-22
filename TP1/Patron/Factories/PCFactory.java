package Patron.Factories;
import Patron.Perifericos.Teclado.*;
import Patron.Perifericos.Auriculares.*;
import Patron.Perifericos.Mouse.*;
import Patron.Perifericos.Periferico;

public class PCFactory implements AbstractFactory {
    public Periferico crearMouse(){
        return new MousePC();
    }
    public Periferico crearTeclado(){
        return new TecladoPC();
    }
    public Periferico crearAuriculares(){
        return new AuricularesPC();
    }
}
