package com.project_mgmt.supplier.dto;

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
