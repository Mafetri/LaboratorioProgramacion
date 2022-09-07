package Patron.Factories;
import Patron.Perifericos.Teclado.*;
import Patron.Perifericos.Auriculares.*;
import Patron.Perifericos.Mouse.*;
import Patron.Perifericos.Periferico;

public class PCFactory implements AbstractFactory {
    public Periferico createMouse(){
        return new MousePC();
    }
    public Periferico createTeclado(){
        return new TecladoPC();
    }
    public Periferico createAuriculares(){
        return new AuricularesPC();
    }
}
