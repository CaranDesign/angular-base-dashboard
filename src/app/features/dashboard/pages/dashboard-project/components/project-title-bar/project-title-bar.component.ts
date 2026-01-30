import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BtnSecondary } from '../../../../../../shared/components/common/buttons/secondary-button/secondary-btn.component';
import { BtnPrimary } from '../../../../../../shared/components/common/buttons/primary-button/primary-btn.component';
import { BtnMedium } from '../../../../../../shared/components/common/buttons/medium-button/medium-btn.component';
import { BtnIcon } from '../../../../../../shared/components/common/buttons/icon-button/icon-btn.component';
import { MaterialModule } from '../../../../../../shared/material/material.module';

@Component({
  selector: 'app-project-title-bar',
  imports: [CommonModule, MaterialModule, BtnPrimary, BtnSecondary, BtnMedium, BtnIcon],
  templateUrl: './project-title-bar.component.html',
  styleUrl: './project-title-bar.component.css',
})
export class ProjectTitleBarComponent {

}
