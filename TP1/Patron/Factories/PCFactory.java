package Patron.Factories;
import Patron.Perifericos.Teclado.*;
import Patron.Perifericos.Auriculares.*;
import Patron.Perifericos.Mouse.*;
import Patron.Perifericos.Periferico;

public class PCFactory implements AbstractFactory {
    public Periferico createPeriferico(String periferico){
        switch(periferico.toUpperCase()){
            case "TECLADO" : return (Teclado) new TecladoPC();
            case "MOUSE" : return (Mouse) new MousePC();
            case "AURICULARES" : return (Auriculares) new AuricularesPC();
            default: return null;
        }
    }
}
