package Patron.Factories;
import Patron.Perifericos.Teclado.*;
import Patron.Perifericos.Auriculares.*;
import Patron.Perifericos.Mouse.*;
import Patron.Perifericos.*;

public class ConsolaFactory implements AbstractFactory{
    public Periferico crearMouse(){
        return new MouseConsola();
    }
    public Periferico crearTeclado(){
        return new TecladoConsola();
    }
    public Periferico crearAuriculares(){
        return new AuricularesConsola();
    }
}
