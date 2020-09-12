import React, { useEffect } from 'react';
import { Card } from 'antd';
import { SurveyCreator, StylesManager } from 'survey-creator';

export default (props: any) => {
  useEffect(() => {
    StylesManager.applyTheme('');
    var options = {
      showToolbox: 'right',
      showLogicTab: true,
      showPropertyGrid: 'right',
      showEmbededSurveyTab: true,
    };
    new SurveyCreator('creatorElement', options);
  }, []);
  return (
    <Card>
      <div id="creatorElement"></div>
    </Card>
  );
};
