package com.project_mgmt.pms.service;

import com.project_mgmt.pms.data.Outlet;
import com.project_mgmt.pms.repository.OutletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OutletService {

    private final OutletRepository outletRepository;

    public List<Outlet> viewOutletAll() {
        return outletRepository.findAll();
    }

    public Map<String, Object> viewOutAnalysis() {
        List<Outlet> outlets = outletRepository.findAll();
        Map<String, Object> result = new HashMap<>();

        long total = outlets.size();
        result.put("totalOutlets", total);

        Map<String, Long> statusCount = outlets.stream()
                .collect(Collectors.groupingBy(
                        Outlet::getProfitStatus,
                        Collectors.counting()
                ));
        result.put("statusCounts", statusCount);

        return result;
    }

    public Optional<Outlet> getOutletById(int outletId) {
        return outletRepository.findById(outletId);
    }
}
