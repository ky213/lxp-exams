import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import SurveyCreator from './SurveyCreator';
import SelectCategory from './SelectCategory';
import { Category } from 'umi';

export interface CreateEditCategoryProps {}

const CreateEditCategory: React.FC<CreateEditCategoryProps> = () => {
  const [selectedCategory, setSelectedCategory]: [Category | null, any] = useState(null);

  return (
    <PageContainer>
      {selectedCategory && <SurveyCreator />}
      {!selectedCategory && <SelectCategory onSelectedCategory={setSelectedCategory} />}
    </PageContainer>
  );
};

export default CreateEditCategory;
