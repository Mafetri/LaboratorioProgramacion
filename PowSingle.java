public class PowSingle {
	public static void main(String[] args) {
		double[] data = new double[10000000];
        for(int i = 1; i < data.length; i++){
            data[i] = 134/i;
        }

        long startTime = System.nanoTime();
        for(int i = 0; i < data.length; i++){
            data[i] = Math.pow(data[i], 243);
        }

        long endTime = System.nanoTime();
        System.out.println("Tiempo: " + (endTime - startTime)/100000);
	}
}