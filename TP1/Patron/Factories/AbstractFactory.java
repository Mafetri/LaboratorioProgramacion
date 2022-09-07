package Patron.Factories;
import Patron.Perifericos.*;

public interface AbstractFactory {
    // Definimos los metodos a heredar
    abstract Periferico createMouse();
    abstract Periferico createTeclado();
    abstract Periferico createAuriculares();
}
