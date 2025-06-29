package com.project_mgmt.pms.data;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.Date;
import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "complain")
public class Complain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int complainId;
    private String complainMessage;
    private String title;
    private String complainStatus;
    private Date createdAt;

   //complainer
    @ManyToOne
    @JoinColumn(name = "complainer_id", referencedColumnName = "empId")
    private Employee complainer;

    //receiver
    @ManyToOne
    @JoinColumn(name = "receiver_id", referencedColumnName = "empId")
    private Employee receiver;
}
