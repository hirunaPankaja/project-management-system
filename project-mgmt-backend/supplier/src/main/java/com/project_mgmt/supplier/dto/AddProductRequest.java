package com.project_mgmt.supplier.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter@Getter
public class AddProductRequest {
        private Long supplierId;
        private List<ProductDTO> products;

}
