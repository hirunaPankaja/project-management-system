package com.example.project_pms.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter@Getter
public class AddProductRequest {
        private Long supplierId;
        private List<com.example.project_pms.dto.ProductDTO> products;

}
