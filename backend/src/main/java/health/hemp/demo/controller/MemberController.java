package health.hemp.demo.controller;

import health.hemp.demo.entity.MemberEntity;
import health.hemp.demo.repository.MemberRepository;
import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberRepository memberRepository;

    public MemberController(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @GetMapping
    public ResponseEntity<?> searchMembers(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdDate") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        PageRequest pageRequest = PageRequest.of(page, size, sort);

        Page<MemberEntity> pageResult;
        if (search != null && !search.isBlank()) {
            pageResult = memberRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrMemberNumberContaining(
                    search, search, search, pageRequest);
        } else {
            pageResult = memberRepository.findAll(pageRequest);
        }

        return ResponseEntity.ok(Map.of(
                "content", pageResult.getContent(),
                "page", pageResult.getNumber(),
                "size", pageResult.getSize(),
                "totalElements", pageResult.getTotalElements(),
                "totalPages", pageResult.getTotalPages()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMemberById(@PathVariable String id) {
        return memberRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createMember(@Valid @RequestBody MemberEntity member) {
        if (memberRepository.findByMemberNumber(member.getMemberNumber()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Member Number " + member.getMemberNumber() + " already exists"));
        }

        if (member.getMemberId() == null || member.getMemberId().isBlank()) {
            member.setMemberId("mbr-" + UUID.randomUUID().toString().substring(0, 8));
        }
        if (member.getCreatedDate() == null) {
            member.setCreatedDate(OffsetDateTime.now());
        }

        MemberEntity saved = memberRepository.save(member);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMember(@PathVariable String id, @Valid @RequestBody MemberEntity member) {
        MemberEntity existing = memberRepository.findById(id).orElse(null);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        existing.setFirstName(member.getFirstName());
        existing.setLastName(member.getLastName());
        existing.setDob(member.getDob());
        existing.setGender(member.getGender());
        existing.setStatus(member.getStatus());
        existing.setPhone(member.getPhone());

        MemberEntity updated = memberRepository.save(existing);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable String id) {
        if (!memberRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        memberRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Member deleted successfully"));
    }
}
