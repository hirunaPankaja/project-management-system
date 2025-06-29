package com.project_mgmt.pms.service;

import com.project_mgmt.pms.data.Supplier;
import com.project_mgmt.pms.data.SupplierProduct;
import com.project_mgmt.pms.dto.AddProductRequest;
import com.project_mgmt.pms.dto.ProductDTO;
import com.project_mgmt.pms.repository.SupplierProductRepository;
import com.project_mgmt.pms.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupplierProductService {

    @Autowired
    private SupplierProductRepository supplierProductRepository;

    @Autowired
    private SupplierRepository supplierRepository;

  //add products
    public List<SupplierProduct> addProducts(AddProductRequest request) {
        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        List<SupplierProduct> products = request.getProducts().stream()
                .map(dto -> {
                    SupplierProduct product = new SupplierProduct();
                    product.setProductName(dto.getProductName());
                    product.setProductDescription(dto.getProductDescription());
                    product.setProductPrice(dto.getProductPrice());
                    product.setSellingUnit(dto.getSellingUnit());
                    product.setCategory(dto.getCategory());

                    if (dto.getProductImage() != null && !dto.getProductImage().isBlank()) {
                        try {
                            byte[] decodedImage = Base64.getDecoder().decode(dto.getProductImage());
                            product.setProductImage(decodedImage);
                        } catch (IllegalArgumentException e) {
                            throw new RuntimeException("Invalid Base64 image data in addProducts", e);
                        }
                    }

                    product.setSupplier(supplier);
                    return product;
                })
                .collect(Collectors.toList());

        return supplierProductRepository.saveAll(products);
    }

   //update product
    public SupplierProduct updateProduct(ProductDTO request) {
        SupplierProduct existingProduct = supplierProductRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setProductName(request.getProductName());
        existingProduct.setProductDescription(request.getProductDescription());
        existingProduct.setProductPrice(request.getProductPrice());
        existingProduct.setSellingUnit(request.getSellingUnit());
        existingProduct.setCategory(request.getCategory());

        if (request.getProductImage() != null && !request.getProductImage().isBlank()) {
            try {
                byte[] decodedImage = Base64.getDecoder().decode(request.getProductImage());
                existingProduct.setProductImage(decodedImage);
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid Base64 image data in updateProduct", e);
            }
        }

        return supplierProductRepository.save(existingProduct);
    }

   //view all products for a supplier
    public List<SupplierProduct> viewProducts(Long supplierId) {
        return supplierProductRepository.findBySupplierId(supplierId);
    }
}
