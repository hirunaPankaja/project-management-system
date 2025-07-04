package com.project_mgmt.pms.controller;
import com.project_mgmt.pms.data.SupplierProduct;
import com.project_mgmt.pms.dto.AddProductRequest;
import com.project_mgmt.pms.dto.ProductDTO;
import com.project_mgmt.pms.service.SupplierProductService;
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

    @DeleteMapping("/delete/{productId}")
    public void deleteProduct(@PathVariable Long productId) {
        supplierProductService.deleteProduct(productId);
    }

}
