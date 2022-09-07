package Patron.Factories;
import Patron.Perifericos.Teclado.*;
import Patron.Perifericos.Auriculares.*;
import Patron.Perifericos.Mouse.*;
import Patron.Perifericos.*;

public class ConsolaFactory implements AbstractFactory{
    public Periferico createMouse(){
        return new MouseConsola();
    }
    public Periferico createTeclado(){
        return new TecladoConsola();
    }
    public Periferico createAuriculares(){
        return new AuricularesConsola();
    }
}
