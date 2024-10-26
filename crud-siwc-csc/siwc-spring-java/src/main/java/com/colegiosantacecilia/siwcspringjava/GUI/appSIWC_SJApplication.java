package com.colegiosantacecilia.siwcspringjava.GUI;

import com.colegiosantacecilia.siwcspringjava.Metodos.Hilos.HiloCloseSpringApplication;
import com.colegiosantacecilia.siwcspringjava.Metodos.Hilos.HiloClosingService;
import com.colegiosantacecilia.siwcspringjava.Metodos.Hilos.HiloServiceStopped;
import com.colegiosantacecilia.siwcspringjava.Metodos.Hilos.HiloSpringApplication;
import com.colegiosantacecilia.siwcspringjava.Metodos.Hilos.HiloStartingService;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Toolkit;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import org.springframework.context.ConfigurableApplicationContext;

/**
 *
 * @author Sebastian Villamizar
 *
 */
public class appSIWC_SJApplication extends javax.swing.JFrame {

    appSIWC_SJApplicationError applicationError;
    ConfigurableApplicationContext cac;
    private boolean statusStartedStopped;
    private Exception exception;

    public appSIWC_SJApplication() {
        initComponents();
        pack();
        lbLoading.setVisible(false);
        txtLb.setVisible(false);
        textAreaScrollPane.setVisible(false);
        textArea.setVisible(false);
        pack();
    }

    public void startingService() {
        System.out.println("StartingService");
        this.txtLb.setForeground(Color.BLACK);
        setLocationRelativeTo(null);
        lbLoading.setVisible(true);
        pack();
        setLocationRelativeTo(null);
        txtLb.setText("STARTING SERVICE");
        txtLb.setVisible(true);
        pack();
        btnRunS.setEnabled(false);
        lblIconClose.setEnabled(false);
        lblReload.setEnabled(false);
        pack();

        if (applicationError != null && applicationError.isVisible()) {
            applicationError.dispose();
        }
        statusStartedStopped = false;
    }

    public void closingService() {
        System.out.println("PARAR SERVICE");
        txtLb.setForeground(new Color(255, 51, 51, 255));
        lbLoading.setVisible(true);
        pack();
        setLocationRelativeTo(null);
        pack();
        txtLb.setText("CLOSING SERVICE");
        txtLb.setVisible(true);
        btnRunS.setEnabled(false);
        setLocationRelativeTo(null);
        pack();
    }

    public void serviceStarted(ConfigurableApplicationContext context) {
        pack();
        btnRunS.setEnabled(true);
        txtLb.setForeground(new Color(102, 255, 102, 255));
        txtLb.setText("SERVICE STARTED");
        btnRunS.setText("STOP SERVICE");
        lbLoading.setVisible(false);
        pack();
        setLocationRelativeTo(null);
        pack();
        cac = context;
    }

    public void serviceClosed() {
        cac.close();
        btnRunS.setText("RESTART SERVICE");
        btnRunS.setEnabled(true);
        lblIconClose.setEnabled(true);
        lblReload.setEnabled(true);
        txtLb.setVisible(false);
        txtLb.setText("");
        setLocationRelativeTo(null);
        pack();
        lbLoading.setVisible(false);
        pack();
        setLocationRelativeTo(null);
        pack();
        statusStartedStopped = false;
    }

    public void stopped(Exception e) {
        statusStartedStopped = true;
        setException(e);
    }

    public void serviceStopped() {
        lbLoading.setVisible(false);
        btnRunS.setEnabled(true);
        lblIconClose.setEnabled(true);
        lblReload.setEnabled(true);
        setLocationRelativeTo(null);
        pack();
        txtLb.setForeground(new Color(239, 103, 103, 255));
        txtLb.setText("SERVICE STOPED");
        if (applicationError == null) {
            applicationError = new appSIWC_SJApplicationError();
        }
        applicationError.setLocationRelativeTo(null);
        applicationError.setTxtAreaError(getException().getMessage());
        if (getException().getCause() != null) {
            applicationError.setTxtLbError(getException().getCause().getMessage());
        } else {
            applicationError.setTxtLbError(getException().getMessage().split(":")[0]);
        }
        pack();
        applicationError.setLocation();
        applicationError.setVisible(true);
    }

    public void compileProject() {
        try {
            // Ejecutar el comando
            Process process = new ProcessBuilder("cmd.exe", "/c", "mvnw.cmd", "spring-boot:run")
                    .directory(new java.io.File("D:\\Proyecto Grado Sebastian\\GitHub\\siwc-csc\\crud-siwc-csc\\siwc-spring-java"))
                    .start();
            System.exit(0);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public JLabel getTxtLb() {
        return txtLb;
    }

    public void setTxtLb(JLabel txtLb) {
        this.txtLb = txtLb;
    }

    public JButton getBtnRunS() {
        return btnRunS;
    }

    public void setBtnRunS(JButton btnRunS) {
        this.btnRunS = btnRunS;
    }

    public JTextArea getTextArea() {
        return textArea;
    }

    public void setTextArea(JTextArea textArea) {
        this.textArea = textArea;
    }

    public JScrollPane getTextAreaScrollPane() {
        return textAreaScrollPane;
    }

    public void setTextAreaScrollPane(JScrollPane textAreaScrollPane) {
        this.textAreaScrollPane = textAreaScrollPane;
    }

    public boolean getStatusStartedStopped() {
        return statusStartedStopped;
    }

    public void setStatusStartedStopped(boolean statusStartedStopped) {
        this.statusStartedStopped = statusStartedStopped;
    }

    public JLabel getLbLoading() {
        return lbLoading;
    }

    public void setLbLoading(JLabel lbLoading) {
        this.lbLoading = lbLoading;
    }

    public JLabel getLblIcon1() {
        return lblIconExtended;
    }

    public void setLblIcon1(JLabel lblIcon1) {
        this.lblIconExtended = lblIcon1;
    }

    public JLabel getLblReload() {
        return lblReload;
    }

    public void setLblReload(JLabel lblReload) {
        this.lblReload = lblReload;
    }

    public JLabel getLblconClose() {
        return lblIconClose;
    }

    public void setLblconClose(JLabel lblconClose) {
        this.lblIconClose = lblconClose;
    }

    public Exception getException() {
        return exception;
    }

    public void setException(Exception exception) {
        this.exception = exception;
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jPanel1 = new javax.swing.JPanel();
        lblIconClose = new javax.swing.JLabel();
        lblIconExtended = new javax.swing.JLabel();
        jPanel2 = new javax.swing.JPanel();
        btnRunS = new javax.swing.JButton();
        lblReload = new javax.swing.JLabel();
        txtLb = new javax.swing.JLabel();
        lbLoading = new javax.swing.JLabel();
        jLabel1 = new javax.swing.JLabel();
        textAreaScrollPane = new javax.swing.JScrollPane();
        textArea = new javax.swing.JTextArea();

        setDefaultCloseOperation(javax.swing.WindowConstants.DO_NOTHING_ON_CLOSE);
        setTitle("appSIWC_SJApplication");
        setBackground(new java.awt.Color(0, 102, 102));
        setUndecorated(true);

        jPanel1.setBackground(new java.awt.Color(255, 255, 255));
        jPanel1.setBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 0, 0), 3));

        lblIconClose.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        lblIconClose.setIcon(new javax.swing.ImageIcon(getClass().getResource("/static/close.png"))); // NOI18N
        lblIconClose.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        lblIconClose.setPreferredSize(new java.awt.Dimension(45, 45));
        lblIconClose.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                lblIconCloseMouseClicked(evt);
            }
        });

        lblIconExtended.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        lblIconExtended.setIcon(new javax.swing.ImageIcon(getClass().getResource("/static/negativo.png"))); // NOI18N
        lblIconExtended.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        lblIconExtended.setPreferredSize(new java.awt.Dimension(45, 45));
        lblIconExtended.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                lblIconExtendedMouseClicked(evt);
            }
        });

        jPanel2.setBackground(new java.awt.Color(255, 255, 255));
        jPanel2.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
        jPanel2.setPreferredSize(new java.awt.Dimension(343, 45));

        btnRunS.setFont(new java.awt.Font("Segoe UI Black", 3, 14)); // NOI18N
        btnRunS.setText("RUN SERVICE");
        btnRunS.setBorder(javax.swing.BorderFactory.createEtchedBorder());
        btnRunS.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        btnRunS.setOpaque(true);
        btnRunS.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnRunSActionPerformed(evt);
            }
        });

        lblReload.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        lblReload.setIcon(new javax.swing.ImageIcon(getClass().getResource("/static/rotate-right-solid.png"))); // NOI18N
        lblReload.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        lblReload.setMaximumSize(new java.awt.Dimension(32, 32));
        lblReload.setPreferredSize(new java.awt.Dimension(45, 45));
        lblReload.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                lblReloadMouseClicked(evt);
            }
        });

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel2Layout.createSequentialGroup()
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(btnRunS, javax.swing.GroupLayout.PREFERRED_SIZE, 168, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 0, 0)
                .addComponent(lblReload, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel2Layout.createSequentialGroup()
                .addGap(0, 0, 0)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(btnRunS, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(lblReload, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addGap(0, 0, 0))
        );

        txtLb.setBackground(new java.awt.Color(255, 255, 255));
        txtLb.setFont(new java.awt.Font("Segoe UI Black", 1, 14)); // NOI18N
        txtLb.setForeground(new java.awt.Color(255, 255, 255));
        txtLb.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);

        lbLoading.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        lbLoading.setIcon(new javax.swing.ImageIcon(getClass().getResource("/static/gifTresPuntosCargandoM.gif"))); // NOI18N

        jLabel1.setFont(new java.awt.Font("Segoe UI Black", 3, 18)); // NOI18N
        jLabel1.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        jLabel1.setText("SERVICE CSC");

        textArea.setBackground(new java.awt.Color(221, 221, 221));
        textArea.setColumns(20);
        textArea.setFont(new java.awt.Font("Segoe UI Black", 3, 10)); // NOI18N
        textArea.setRows(5);
        textArea.setBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(57, 121, 107), 3));
        textAreaScrollPane.setViewportView(textArea);

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 241, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(lblIconExtended, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 0, 0)
                .addComponent(lblIconClose, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(textAreaScrollPane)
                    .addComponent(lbLoading, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(txtLb, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jPanel2, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addContainerGap())
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(lblIconExtended, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(lblIconClose, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jLabel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addGap(14, 14, 14)
                .addComponent(jPanel2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(txtLb, javax.swing.GroupLayout.PREFERRED_SIZE, 41, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(lbLoading, javax.swing.GroupLayout.PREFERRED_SIZE, 74, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(8, 8, 8)
                .addComponent(textAreaScrollPane, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(8, 8, 8))
        );

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void btnRunSActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnRunSActionPerformed

        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension screenSize = toolkit.getScreenSize();
        getTextAreaScrollPane().setPreferredSize(new Dimension((int) (screenSize.getWidth() - ((screenSize.getWidth() * 8) / 100)),
                (int) ((screenSize.getHeight()) - ((screenSize.getHeight() * 40) / 100))));
        getTextArea().setEditable(false);
        setLocationRelativeTo(null);
        pack();

        setLocationRelativeTo(null);
        pack();

        if (btnRunS.getText().equals("STOP SERVICE") && txtLb.getText().equals("SERVICE STARTED")) {
            HiloClosingService hiloClosingService = new HiloClosingService(this);
            hiloClosingService.start();
            HiloServiceStopped hiloServiceStopped = new HiloServiceStopped(this);
            HiloCloseSpringApplication hiloCloseSpringApplication = new HiloCloseSpringApplication(this, hiloClosingService, hiloServiceStopped);
            hiloCloseSpringApplication.start();
        } else {
            HiloStartingService hiloStartingService = new HiloStartingService(this);
            hiloStartingService.start();
            HiloServiceStopped hiloServiceStopped = new HiloServiceStopped(this);
            HiloSpringApplication hiloSpringApplication = new HiloSpringApplication(this, hiloStartingService, cac, hiloServiceStopped);
            hiloSpringApplication.start();
        }

    }//GEN-LAST:event_btnRunSActionPerformed

    private void lblIconCloseMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_lblIconCloseMouseClicked
        if (lblIconClose.isEnabled())
            System.exit(0);
    }//GEN-LAST:event_lblIconCloseMouseClicked

    private void lblIconExtendedMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_lblIconExtendedMouseClicked
        this.setExtendedState(1);
    }//GEN-LAST:event_lblIconExtendedMouseClicked

    private void lblReloadMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_lblReloadMouseClicked
        // TODO add your handling code here:
    }//GEN-LAST:event_lblReloadMouseClicked

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(appSIWC_SJApplication.class
                    .getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(appSIWC_SJApplication.class
                    .getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(appSIWC_SJApplication.class
                    .getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(appSIWC_SJApplication.class
                    .getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(() -> {
            new appSIWC_SJApplication().setVisible(true);
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btnRunS;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JLabel lbLoading;
    private javax.swing.JLabel lblIconClose;
    private javax.swing.JLabel lblIconExtended;
    private javax.swing.JLabel lblReload;
    private javax.swing.JTextArea textArea;
    private javax.swing.JScrollPane textAreaScrollPane;
    private javax.swing.JLabel txtLb;
    // End of variables declaration//GEN-END:variables
}
