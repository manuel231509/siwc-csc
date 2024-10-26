package com.colegiosantacecilia.siwcspringjava;

import com.colegiosantacecilia.siwcspringjava.GUI.appSIWC_SJApplication;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import javax.swing.SwingUtilities;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;

/**
 *
 * @author Sebastian Villamizar *
 */
@SpringBootApplication
public class SiwcSpringJavaApplication {

    private static appSIWC_SJApplication app;
    public static Process springBootProcess;
    public static void main(String[] args) {
        if (app == null) {
            app = new appSIWC_SJApplication();
        }

        // Redirigir la salida estándar (System.out) al JTextArea
        PipedOutputStream pipedOut = new PipedOutputStream();
        BufferedReader reader;

        try {
            reader = new BufferedReader(new InputStreamReader(new PipedInputStream(pipedOut)));
            PrintStream printStream = new PrintStream(pipedOut);
            System.setOut(printStream);
            System.setErr(printStream); // Captura errores también
        } catch (IOException e) {
            app.stopped(e);
            app.serviceStopped();
            return;
        }

        // Hilo para leer el output y escribirlo en el JTextArea
        Thread readerThread = new Thread(() -> {
            String line;
            try {
                // Lee la salida estándar y la redirige al JTextArea
                while ((line = reader.readLine()) != null) {
                    String logLine = line;
                    synchronized (app.getTextArea()) {
                        SwingUtilities.invokeLater(() -> {
                            app.getTextArea().append(logLine + "\n");
                            app.getTextArea().setCaretPosition(app.getTextArea().getDocument().getLength());
                        });
                    }
                }
            } catch (IOException e) {
                app.stopped(e);
                app.serviceStopped();
            }
        });

        // Iniciar el hilo que lee System.out
        readerThread.start();
        app.setLocationRelativeTo(null);
        app.setVisible(true); // Mostrar la GUI
    }
}
