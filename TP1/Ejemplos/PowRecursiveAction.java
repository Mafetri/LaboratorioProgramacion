package Ejemplos;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveAction;

public class PowRecursiveAction {
	public static void main(String[] args) {
		double [] data = new double[10000000];
        for(int i = 1; i < data.length; i++){
            data[i] = 134/i;
        }

        long startTime = System.nanoTime();
		ForkJoinPool pool = new ForkJoinPool();
		Pow app = new Pow(data, 0, data.length);
		pool.invoke(app);
        long endTime = System.nanoTime();

        System.out.println("Tiempo: " + (endTime - startTime)/1000000);
	}
}
class Pow extends RecursiveAction {
    final int threshold = 100;
    int start, end;
    double[] data;
    Pow(double[] data, int start, int end) {
        this.start = start;
        this.end = end;
        this.data = data;
    }

    @Override
    protected void compute() {
        if((end - start) < threshold){
            for(int i = start; i < end; i++){
                data[i] = Math.pow(data[i], 25);
            }
        }else {
            int mid = (start + end)/2;
            invokeAll(new Pow(data, start, mid),new Pow(data, mid, end));
        }
    }
}