package Patron.Factories;
import Patron.Perifericos.*;

public interface AbstractFactory {
    // Definimos los metodos a heredar
    abstract Periferico crearMouse();
    abstract Periferico crearTeclado();
    abstract Periferico crearAuriculares();
}
