package com.project_mgmt.pms.dto;

import lombok.Getter;
import lombok.Setter;
import com.project_mgmt.pms.dto.ProductDTO;

import java.util.List;

@Setter@Getter
public class AddProductRequest {
        private Long supplierId;
        private List<ProductDTO> products;

}
