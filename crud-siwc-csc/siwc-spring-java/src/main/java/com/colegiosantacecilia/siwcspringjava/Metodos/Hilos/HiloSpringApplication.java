package com.colegiosantacecilia.siwcspringjava.Metodos.Hilos;

import com.colegiosantacecilia.siwcspringjava.GUI.appSIWC_SJApplication;
import com.colegiosantacecilia.siwcspringjava.SiwcSpringJavaApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;

/**
 *
 * @author Sebastian Villamizar
 *
 */
public class HiloSpringApplication extends Thread {

    @Autowired
    appSIWC_SJApplication application;

    ConfigurableApplicationContext cac = null;

    HiloStartingService hiloStartingService;

    HiloServiceStopped hiloServiceStopped;

    public HiloSpringApplication(appSIWC_SJApplication app, HiloStartingService hss, ConfigurableApplicationContext context, HiloServiceStopped hss1) {
        application = app;
        hiloStartingService = hss;
        cac = context;
        hiloServiceStopped = hss1;
    }

    @Override
    public void run() {
        try {
            hiloStartingService.join();
        } catch (InterruptedException ex) {
            application.stopped(ex);
            hiloServiceStopped.start();
        }
        System.out.println("START THREAD 2");

        try {
            application.getTextAreaScrollPane().setVisible(true);
            application.getTextArea().setVisible(true);
            application.pack();
            application.setLocationRelativeTo(null);
            application.pack();

            cac = SpringApplication.run(SiwcSpringJavaApplication.class);
            application.setLocationRelativeTo(null);
            application.pack();
            application.serviceStarted(cac);
        } catch (Exception e) {
            application.stopped(e);
            hiloServiceStopped.setHiloSpringApplication(this);
            hiloServiceStopped.start();
        }

        try {
            if (!application.getStatusStartedStopped()) {
                join();
            }
        } catch (InterruptedException e1) {
            application.stopped(e1);
            hiloServiceStopped.setHiloSpringApplication(this);
            hiloServiceStopped.start();
        }
        System.out.println("END THREAD 2");
    }
}
