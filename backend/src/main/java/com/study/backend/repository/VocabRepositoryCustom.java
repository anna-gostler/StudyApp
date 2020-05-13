package com.study.backend.repository;

import java.util.List;
import com.study.backend.data.Vocab;

public interface VocabRepositoryCustom {
    List<Vocab> query(DynamicQuery dynamicQuery);
    boolean existsQuery(DynamicQuery dynamicQuery);
    int countAddedToday(DynamicQuery dynamicQuery);
}