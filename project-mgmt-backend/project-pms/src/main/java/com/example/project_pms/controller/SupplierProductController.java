package com.example.project_pms.controller;
import com.example.project_pms.data.SupplierProduct;
import com.example.project_pms.dto.AddProductRequest;
import com.example.project_pms.dto.ProductDTO;
import com.example.project_pms.service.SupplierProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/supplier/product")
public class SupplierProductController {
    @Autowired
    private SupplierProductService supplierProductService;

    @PostMapping("/add")
    public List<SupplierProduct> addProducts(@RequestBody AddProductRequest request) {
        return supplierProductService.addProducts(request);
    }


    @PutMapping("/update")
    public SupplierProduct updateProduct(@RequestBody ProductDTO request) {
        return supplierProductService.updateProduct(request);
    }

    @GetMapping("/view/{supplierId}")
    public List<SupplierProduct> viewProducts(@PathVariable Long supplierId) {
        return supplierProductService.viewProducts(supplierId);
    }
}
