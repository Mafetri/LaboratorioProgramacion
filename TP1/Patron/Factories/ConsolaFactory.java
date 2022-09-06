package Patron.Factories;
import Patron.Perifericos.Teclado.*;
import Patron.Perifericos.Auriculares.*;
import Patron.Perifericos.Mouse.*;
import Patron.Perifericos.*;

public class ConsolaFactory implements AbstractFactory{
    public Periferico createPeriferico(String periferico){
        switch(periferico.toUpperCase()){
            case "TECLADO" : return (Teclado) new TecladoConsola();
            case "MOUSE" : return (Mouse) new MouseConsola();
            case "AURICULARES" : return (Auriculares) new AuricularesConsola();
            default: return null;
        }
    }
}
