package com.example.project_pms.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductDTO {
    private Long productId;
    private String productName;
    private String productDescription;
    private double productPrice;
    private String sellingUnit;
    private String category;
    private String productImage;
}
