package com.project_mgmt.pms.service;

import com.project_mgmt.pms.data.Location;
import com.project_mgmt.pms.data.Outlet;
import com.project_mgmt.pms.data.Proposal;
import com.project_mgmt.pms.repository.LocationRepository;
import com.project_mgmt.pms.repository.OutletRepository;
import com.project_mgmt.pms.repository.ProposalRepositry;
import com.project_mgmt.pms.repository.ProposalRepositry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;
    private final OutletRepository outletRepository;
    private final ProposalRepositry proposalRepository;

    public List<Map<String, Object>> displayOnMap() {
        List<Location> locations = locationRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Location location : locations) {
            Map<String, Object> locationData = new HashMap<>();
            locationData.put("locationId", location.getLocationId());
            locationData.put("longitude", location.getLongitude());
            locationData.put("latitude", location.getLatitude());

            // Check if this location is linked to a Proposal
            Optional<Proposal> proposalOpt = proposalRepository.findByLocation(location);
            if (proposalOpt.isPresent()) {
                Map<String, Object> proposalData = new HashMap<>();
                Proposal p = proposalOpt.get();
                proposalData.put("proposalId", p.getProposalId());
                proposalData.put("proposalName", p.getProposalName());
                proposalData.put("proposalStatus", p.getProposalStatus());
                // add other fields as needed
                locationData.put("proposal", proposalData);
            } else {
                // Check if location belongs to Outlet
                Optional<Outlet> outletOpt = outletRepository.findByLocation(location);
                outletOpt.ifPresent(outlet -> {
                    Map<String, Object> outletData = new HashMap<>();
                    outletData.put("outletId", outlet.getOutletId());
                    outletData.put("outletName", outlet.getOutletName());
                    outletData.put("profitStatus", outlet.getProfitStatus());
                    // add other fields as needed
                    locationData.put("outlet", outletData);
                });
            }

            result.add(locationData);
        }

        return result;
    }
}
