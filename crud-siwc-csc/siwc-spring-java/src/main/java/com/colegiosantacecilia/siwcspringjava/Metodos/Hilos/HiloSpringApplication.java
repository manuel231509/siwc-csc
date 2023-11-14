package com.colegiosantacecilia.siwcspringjava.Metodos.Hilos;

import com.colegiosantacecilia.siwcspringjava.GUI.appSIWC_SJApplication;
import com.colegiosantacecilia.siwcspringjava.SiwcSpringJavaApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;

/**
 *
 * @author Sebastian Villamizar
 *
 */
public class HiloSpringApplication extends Thread {

    appSIWC_SJApplication application;

    HiloStartingService hiloStartingService;

    public HiloSpringApplication(appSIWC_SJApplication app, HiloStartingService hss) {
        application = app;
        hiloStartingService = hss;
    }

    @Override
    public void run() {
        try {
            hiloStartingService.join();
        } catch (InterruptedException ex) {
            ex.printStackTrace();
        }
        System.out.println("START THREAD 2");

        try {
            ConfigurableApplicationContext cac = SpringApplication.run(SiwcSpringJavaApplication.class);
            application.serviceStarted(cac);
        } catch (Exception e) {
            application.serviceStoped(e);
        }
        System.out.println("END THREAD 2");
    }
}
